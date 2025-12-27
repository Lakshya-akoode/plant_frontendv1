import Link from 'next/link';

export const metadata = {
  title: "Plant Chat® - Plant-Based Wellness Platform",
  description: "Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness.",
};

export default function AdminLayout({ children }) {
  return (
    <>
    <link href="/admin/css/akoode/bootstrap.min.css" rel="stylesheet" media="screen" />
        <link rel="stylesheet" href="/admin/css/akoode/swiper.min.css" />
        <link href="/admin/css/akoode/fontawesome.css" rel="stylesheet" media="screen" />
        <link href="/admin/css/akoode/animate.css" rel="stylesheet" />
        <link href="/admin/css/main.css" rel="stylesheet" media="screen" />
        <link href="/admin/css/dashbord_navitaion.css" rel="stylesheet" media="screen" />
        <link href="/admin/css/flaticon.css" rel="stylesheet" media="screen" />
        <link href="/admin/css/dashboard-custom.css" rel="stylesheet" media="screen" />
        <link href="/admin/css/plantchat-modern-dashboard.css" rel="stylesheet" media="screen" />
      {children}
    </>
  );
}
