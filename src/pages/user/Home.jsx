import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24">

      {/* 🌿 HERO SECTION */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 leading-tight">
            Smart Waste Management System
          </h1>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            A digital platform to report waste issues, request pickups,
            and work together towards a cleaner, greener city.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/report")}
              className="bg-green-700 text-white px-8 py-4 rounded-xl 
                         font-semibold shadow hover:bg-green-800 
                         hover:shadow-lg transition"
            >
              🚨 Report Waste
            </button>

            <button
              onClick={() => navigate("/request")}
              className="border-2 border-green-700 text-green-700 
                         px-8 py-4 rounded-xl font-semibold 
                         hover:bg-green-100 transition"
            >
              🚛 Request Pickup
            </button>
          </div>
        </div>
      </section>

      {/* ⭐ FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          What You Can Do
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Report Issues"
            desc="Notify authorities about garbage overflow, illegal dumping, or unhygienic areas."
          />
          <FeatureCard
            title="Request Pickup"
            desc="Schedule doorstep waste collection for household or bulk waste easily."
          />
          <FeatureCard
            title="Track Status"
            desc="Follow the progress of your reports and pickup requests in real time."
          />
        </div>
      </section>

      {/* 🔄 HOW IT WORKS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            How It Works
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <StepCard
              step="1"
              title="Login or Register"
              desc="Create an account to access all services."
            />
            <StepCard
              step="2"
              title="Report or Request"
              desc="Submit waste issues or schedule a pickup."
            />
            <StepCard
              step="3"
              title="Action Taken"
              desc="Authorities review and resolve the request."
            />
          </div>
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Together, Let’s Keep Our City Clean 🌍
          </h2>
          <p className="mt-4 text-gray-600">
            Your small action can make a big difference.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-8 bg-green-700 text-white px-10 py-4 
                       rounded-xl font-semibold shadow 
                       hover:bg-green-800 hover:shadow-lg transition"
          >
            Get Started
          </button>
        </div>
      </section>

    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition text-center">
    <h3 className="text-xl font-semibold text-green-700">
      {title}
    </h3>
    <p className="mt-3 text-gray-600 text-sm">
      {desc}
    </p>
  </div>
);

const StepCard = ({ step, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
    <div className="text-5xl font-extrabold text-green-700">
      {step}
    </div>
    <h3 className="mt-4 text-xl font-semibold text-gray-800">
      {title}
    </h3>
    <p className="mt-2 text-gray-600 text-sm">
      {desc}
    </p>
  </div>
);

export default Home;
