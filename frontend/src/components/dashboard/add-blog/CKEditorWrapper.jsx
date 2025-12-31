"use client";

import { useEffect, useRef, useState } from 'react';

// Custom Upload Adapter for CKEditor
class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            file => new Promise((resolve, reject) => {
                // Get authentication token from localStorage
                const userData = JSON.parse(localStorage.getItem("user") || "{}");
                const token = userData.token;

                if (!token) {
                    reject('User not authenticated!');
                    return;
                }

                // File validation
                const maxSize = 10 * 1024 * 1024; // 10MB
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

                if (!allowedTypes.includes(file.type)) {
                    reject(`File type not allowed. Please upload: JPEG, PNG, GIF, WebP, or SVG`);
                    return;
                }

                if (file.size > maxSize) {
                    reject(`File size exceeds 10MB. Please upload a smaller image.`);
                    return;
                }

                const data = new FormData();
                // Backend uses req.files (array), likely expects 'images' field name
                data.append('images', file);

                // Use the same base URL as other API calls
                const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL + 'api/upload';

                console.log('📤 Uploading image to:', apiUrl);
                console.log('📎 File:', file.name, file.type, file.size, 'bytes');

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: data,
                })
                    .then(response => {
                        console.log('📥 Response status:', response.status);

                        // Clone response to read it twice (once for logging, once for parsing)
                        return response.clone().text().then(text => {
                            console.log('📥 Response body:', text);
                            try {
                                return { response, json: JSON.parse(text) };
                            } catch (e) {
                                return { response, json: { message: text } };
                            }
                        });
                    })
                    .then(({ response, json: result }) => {
                        if (response.ok) {
                            // Backend returns an array of URLs directly
                            if (Array.isArray(result) && result.length > 0) {
                                const imageUrl = result[0]; // Get first URL from array
                                console.log('✅ Upload successful:', imageUrl);
                                resolve({
                                    default: imageUrl
                                });
                            } else {
                                const errorMsg = 'No image URL returned from server';
                                console.error('❌ Upload failed:', errorMsg, result);
                                reject(errorMsg);
                            }
                        } else {
                            const errorMsg = result.message || `Upload failed with status ${response.status}`;
                            console.error('❌ Upload failed:', errorMsg, result);
                            reject(errorMsg);
                        }
                    })
                    .catch(error => {
                        console.error('❌ Upload error:', error);
                        reject(error.toString());
                    });
            })
        );
    }

    abort() {
        // Handle upload abort if needed
    }
}

// Plugin function to add custom upload adapter
function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

const CKEditorWrapper = ({ data, onChange, config }) => {
    const editorRef = useRef(null);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        };
        setEditorLoaded(true);
    }, []);

    // Merge custom config with upload adapter
    const editorConfig = {
        ...config,
        extraPlugins: [CustomUploadAdapterPlugin],
    };

    return (
        <>
            {editorLoaded && CKEditor && ClassicEditor ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={data}
                    onChange={onChange}
                    config={editorConfig}
                />
            ) : (
                <div style={{
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    textAlign: 'center',
                    color: '#666'
                }}>
                    Loading editor...
                </div>
            )}
        </>
    );
};

export default CKEditorWrapper;
