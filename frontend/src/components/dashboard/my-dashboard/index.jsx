import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import TopRecommendedPlants from "./TopRecommendedPlants";
import HealthCategoryDistribution from "./HealthCategoryDistribution";
import CopyRight from "../../common/footer/CopyRight";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <div className="d-lg-none">
        <MobileMenu />
      </div>

      <div className="dashboard_sidebar_menu eati">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section
        className="our-dashbord dashbord bgc-f7 pb50 "
        style={{ paddingTop: "20px" }}
      >
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12">
                  <div className="dashboard-stats-banner">
                    <h2 className="dashboard-title">
                      Your Dashboard Overview
                    </h2>
                    <div className="row mt-5">
                      <AllStatistics />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row mt-3">
                <div className="col-xl-7">
                  <div className="application_statics">
                    <h4 className="mb-4">
                      <span className="flaticon-chart" style={{ marginRight: '8px', color: '#22c55e' }}></span>
                      User Growth Over Time
                    </h4>
                    <StatisticsChart />
                  </div>
                </div>
                {/* End statistics chart */}

                <div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">
                      <span className="flaticon-leaf" style={{ marginRight: '8px', color: '#22c55e' }}></span>
                      Trending Plant Choices
                    </h4>
                    <TopRecommendedPlants />
                  </div>
                </div>
              </div>
              {/* End .row  */}

              <div className="row mt-4">
                <div className="col-xl-7">
                  <div className="application_statics">
                    <h4 className="mb-4">Recent Activity</h4>
                    <Activities />
                  </div>
                </div>
                {/* End health category chart */}

                <div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Audience Demographics</h4>
                    <p>Distribution of users based on gender identity</p>
                    <HealthCategoryDistribution />
                  </div>
                </div>
              </div>
              {/* End .row  */}
              <CopyRight />
              {/* <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div> */}

              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
