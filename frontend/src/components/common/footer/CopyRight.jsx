import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';

const CopyRight = () => {
    return (
      <>
<div className="row mt20">
<div className="col-lg-12">
  <div className="copyright-widget text-center">
    <p>Copyright© 2026 <a href="https://nanobles.com/" target="_blank" rel="noopener noreferrer">Nanobles Inc.</a> All rights reserved | Made With  <a target="_blank" href="https://www.akoode.com/"> <i className="fa fa-heart"></i> </a></p>
  </div>
</div>
</div> 
<ToastContainer /> 
</>
 );
};

export default CopyRight;