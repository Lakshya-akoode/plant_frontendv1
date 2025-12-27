const Social = () => {
  const socialContent = [
   { id: 1, liveLink: "https://www.facebook.com/akoodeInfraventurespvtltd/", icon: "fa-facebook" },
    { id: 2, liveLink: "https://x.com/akoodeinfra/", icon: "fa-x-twitter" },
    { id: 3, liveLink: "https://www.instagram.com/akoodeinfraventures/", icon: "fa-instagram" },
    { id: 4, liveLink: "https://www.linkedin.com/company/akoode-infraventures-pvt-ltd/", icon: "fa-linkedin-in" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
            <i className={`fa ${item.icon}`}></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default Social;
