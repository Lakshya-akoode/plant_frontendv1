"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import './tiptap-styles.css';

// Custom Font Size Extension
import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace('px', ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}px`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: fontSize })
                    .run();
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run();
            },
        };
    },
});

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        // Create a file input element
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml';

        input.onchange = async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            // File validation
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

            if (!allowedTypes.includes(file.type)) {
                alert('File type not allowed. Please upload: JPEG, PNG, GIF, WebP, or SVG');
                return;
            }

            if (file.size > maxSize) {
                alert('File size exceeds 10MB. Please upload a smaller image.');
                return;
            }

            try {
                // Get authentication token
                const userData = JSON.parse(localStorage.getItem("user") || "{}");
                const token = userData.token;

                if (!token) {
                    alert('User not authenticated!');
                    return;
                }

                // Prepare form data
                const formData = new FormData();
                formData.append('images', file);

                // Upload to backend
                const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL + 'api/upload';
                console.log('📤 Uploading image to:', apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();

                    // Backend returns an array of URLs
                    if (Array.isArray(result) && result.length > 0) {
                        const imageUrl = result[0];
                        console.log('✅ Upload successful:', imageUrl);

                        // Insert image into editor
                        editor.chain().focus().setImage({ src: imageUrl }).run();
                    } else {
                        alert('No image URL returned from server');
                    }
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || `Upload failed with status ${response.status}`);
                }
            } catch (error) {
                console.error('❌ Upload error:', error);
                alert('Failed to upload image: ' + error.message);
            }
        };

        input.click();
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 64, 72];

    return (
        <div className="tiptap-menubar">
            {/* Headings */}
            <select
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'paragraph') {
                        editor.chain().focus().setParagraph().run();
                    } else {
                        editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
                    }
                }}
                className="tiptap-select"
            >
                <option value="paragraph">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
            </select>

            {/* Font Size */}
            <select
                onChange={(e) => {
                    const size = e.target.value;
                    if (size) {
                        editor.chain().focus().setFontSize(size).run();
                    }
                }}
                className="tiptap-select"
            >
                <option value="">Font Size</option>
                {fontSizes.map(size => (
                    <option key={size} value={size}>{size}px</option>
                ))}
            </select>

            <div className="tiptap-divider"></div>

            {/* Text Formatting */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
                type="button"
                title="Bold"
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                type="button"
                title="Italic"
            >
                <em>I</em>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
                type="button"
                title="Underline"
            >
                <u>U</u>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
                type="button"
                title="Strikethrough"
            >
                <s>S</s>
            </button>

            <div className="tiptap-divider"></div>

            {/* Text Color */}
            <input
                type="color"
                onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
                value={editor.getAttributes('textStyle').color || '#000000'}
                className="tiptap-color-picker"
                title="Text Color"
            />

            <div className="tiptap-divider"></div>

            {/* Alignment */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                type="button"
                title="Align Left"
            >
                ⬅
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                type="button"
                title="Align Center"
            >
                ↔
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                type="button"
                title="Align Right"
            >
                ➡
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                type="button"
                title="Justify"
            >
                ≡
            </button>

            <div className="tiptap-divider"></div>

            {/* Lists */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                type="button"
                title="Bullet List"
            >
                • List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                type="button"
                title="Numbered List"
            >
                1. List
            </button>

            <div className="tiptap-divider"></div>

            {/* Insert */}
            <button
                onClick={setLink}
                className={editor.isActive('link') ? 'is-active' : ''}
                type="button"
                title="Add Link"
            >
                🔗 Link
            </button>
            <button
                onClick={addImage}
                type="button"
                title="Add Image"
            >
                🖼️ Image
            </button>
            <button
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                type="button"
                title="Insert Table"
            >
                📊 Table
            </button>

            <div className="tiptap-divider"></div>

            {/* Blockquote & Code */}
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                type="button"
                title="Blockquote"
            >
                " Quote
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
                type="button"
                title="Code Block"
            >
                {'<>'} Code
            </button>

            <div className="tiptap-divider"></div>

            {/* Undo/Redo */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                type="button"
                title="Undo"
            >
                ↶ Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                type="button"
                title="Redo"
            >
                ↷ Redo
            </button>
        </div>
    );
};

const TiptapEditor = ({ data, onChange }) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            FontSize,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Placeholder.configure({
                placeholder: 'Write your blog content here...',
            }),
        ],
        content: data || '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    useEffect(() => {
        if (editor && data !== editor.getHTML()) {
            editor.commands.setContent(data || '');
        }
    }, [data, editor]);

    return (
        <div className="tiptap-wrapper">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="tiptap-editor" />
        </div>
    );
};

export default TiptapEditor;
