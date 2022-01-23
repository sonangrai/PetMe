import Footer from "../components/layouts/footer/Footer";
import Header from "../components/layouts/header/Header";
import NextImage from "../components/layouts/image/NextImage";
import Meta from "../components/seo/Meta";
import Router from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";

/**
 *
 * @returns Home Page
 */
const Home = ({ auth }) => {
  /**
   * Redirect user to login if not logged in
   */
  useEffect(() => {
    if (!auth.isAuthenticated) {
      Router.push("/login");
    }
  }, []);

  return (
    <>
      <Meta title="PetMe" description="" image="" />
      <Header />
      <NextImage height="50px" layout="contain" />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
