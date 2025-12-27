// import Link from "next/link";

// const TermsConditions = () => {
//   const termsContent = [
//     {
//       id: 1,
//       title: "Privacy Policy",
//       text1: `Curabitur massa magna, tempor in blandit id, porta in ligula.
//       Aliquam laoreet nisl massa, at interdum mauris sollicitudin et.
//       Mauris risus lectus, tristique at nisl at, pharetra tristique
//       enim.`,
//       text2: `Nullam this is a link nibh facilisis, at malesuada orci congue.
//       Nullam tempus sollicitudin cursus. Nulla elit mauris, volutpat eu
//       varius malesuada, pulvinar eu ligula. Ut et adipiscing erat.
//       Curabitur adipiscing erat vel libero tempus congue. Nam pharetra
//       interdum vestibulum. Aenean gravida mi non aliquet porttitor.
//       Praesent dapibus, nisi a faucibus tincidunt, quam dolor
//       condimentum metus, in convallis libero ligula ut`,
//     },
//     {
//       id: 2,
//       title: "Our Terms",
//       text1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
//       mollis et sem sed sollicitudin. Donec non odio neque. Aliquam
//       hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque
//       bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam
//       tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this
//       is a text link libero tempus congue.`,
//       text2: `Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin
//       sagittis dolor sed mi elementum pretium. Donec et justo ante.
//       Vivamus egestas sodales est, eu rhoncus urna semper eu. Cum sociis
//       natoque penatibus et magnis dis parturient montes, nascetur
//       ridiculus mus. Integer tristique elit lobortis purus bibendum,
//       quis dictum metus mattis. Phasellus posuere felis sed eros
//       porttitor mattis. Curabitur massa magna, tempor in blandit id,
//       porta in ligula. Aliquam laoreet nisl massa, at interdum mauris
//       sollicitudin et.`,
//     },
//   ];

//   const navigationList = [
//     { id: 1, routeLink: "#", name: "Welcome Text" },
//     { id: 2, routeLink: "#", name: "Our Terms" },
//     { id: 3, routeLink: "#", name: "Conditions" },
//     { id: 4, routeLink: "#", name: "Your Privacy" },
//     { id: 5, routeLink: "#", name: "Informations We Collect" },
//   ];

//   return (
//     <div className="row">
//       <div className="col-lg-8 col-xl-8">
//         <div className="terms_condition_grid">
//           {termsContent.map((item) => (
//             <div className="grids mb30" key={item.id}>
//               <h4>{item.title}</h4>
//               <p className="mb20">{item.text1}</p>
//               <p>{item.text2}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-4 col-xl-4">
//         <div className="terms_condition_widget">
//           <h4 className="title">Navigation</h4>
//           <div className="widget_list">
//             <ul className="list_details">
//               {navigationList.map((list) => (
//                 <li key={list.id}>
//                   <Link href={list.routeLink}>
//                     <i className="fa fa-caret-right mr10"></i>
//                     {list.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsConditions;
export default function PrivacyPolicy() {
  return (
    <div className="container my-5 privacy-policy-page">
      <h1 className="mb-4">Privacy Policy</h1>

      <p>
        At <strong>akoode INFRAVENTURES PRIVATE LIMITED</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us.
      </p>

      <h4 className="mt-4">1. Information We Collect</h4>
      <ul>
        <li>Personal details (name, contact number, email, etc.)</li>
        <li>Property preferences and inquiries</li>
        <li>Website usage data through cookies and analytics tools</li>
      </ul>

      <h4 className="mt-4">2. How We Use Your Information</h4>
      <ul>
        <li>To respond to your inquiries or property interests</li>
        <li>To share updates on relevant projects, offers, or promotions</li>
        <li>To improve our website and marketing efforts</li>
      </ul>

      <h4 className="mt-4">3. Data Sharing</h4>
      <p>
        We do not sell or rent your personal information. We may share your details with developers or service partners only for purposes related to your property inquiries.
      </p>

      <h4 className="mt-4">4. Data Security</h4>
      <p>
        We use reasonable security measures to protect your information from unauthorized access or disclosure.
      </p>

      <h4 className="mt-4">5. Third-Party Links</h4>
      <p>
        Our website may contain links to external sites. We are not responsible for the privacy practices of those websites.
      </p>

      <h4 className="mt-4">6. Consent</h4>
      <p>
        By using our website and submitting your details, you consent to our privacy practices.
      </p>

      <h4 className="mt-4">7. Updates to this Policy</h4>
      <p>
        We reserve the right to update this policy at any time. Changes will be posted on this page with a revised date.
      </p>

      <h4 className="mt-4">Contact Us</h4>
      <p>
        For any privacy concerns or requests, call us at <a href="tel:+917421922000">7421922000</a>.
      </p>
    </div>
  );

}
