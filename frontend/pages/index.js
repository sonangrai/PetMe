import Footer from "../components/layouts/footer/Footer";
import Header from "../components/layouts/header/Header";
import NextImage from "../components/layouts/image/NextImage";
import Meta from "../components/seo/Meta";

/**
 *
 * @returns Home Page
 */

export default function Home() {
  return (
    <>
      <Meta title="PetMe" description="" image="" />
      <Header />
      <NextImage height="50px" layout="contain" />
      <Footer />
    </>
  );
}
