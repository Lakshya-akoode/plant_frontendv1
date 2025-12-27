'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCategoryTableData } from "@/api/frontend/category";

const CopyrightFooter = () => {
  const [categories, setCategories] = useState([]);
      
      const fetchCategories = async () => {
        try {
          const response = await getCategoryTableData();
    
          setCategories(response || []);
        } catch (err) {
          console.error("Error fetching Category:", err);
        }
      };
    
      // ();
    useEffect(() => {
            fetchCategories();
          
        }, []);
 
  

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6 order-lg-2">
        <div className="copyright-widget text-end">
        <span>© 2025 akoode. All rights reserved | Made With <a target="_blank" href="https://www.akoode.com/"> <i className="fa fa-heart"></i> </a></span>
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {categories.map((item) => (
              <li className="list-inline-item" key={item._id}>
                <Link href={`/property-list?cat=${item._id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End .col */}

      
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
