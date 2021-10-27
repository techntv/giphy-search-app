import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");

  useEffect(() => {
    setSearchResults(initialData.catGiphys.data);
  }, [initialData]);

  const search = async (event) => {
    event.preventDefault();
    event.preventDefault();
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`
    );
    giphys = await giphys.json();
    setSearchResults(giphys.data);
    setSearchTerm(formInputs.searchTerm);
  };

  const handleInputs = (event) => {
    let { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  return (
    <div>
      <Head>
        <title>Giphy Search App</title>
        <meta
          name="description"
          content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <main>
        <div className="logo-container">
          <Image src="/logo.png" alt="logo" layout="fill" />
        </div>
        <h1>Giphy Search App</h1>
        <form onSubmit={search}>
          <input
            name="searchTerm"
            onChange={handleInputs}
            type="text"
            required
          />
          <button>Search</button>
        </form>
        <h1>Search results for: {searchTerm}</h1>
        <p>
          Share this search with others:
          <Link href="/search/[pid]" as={`/search/${searchTerm}`}>
            <a>{`http://localhost:3000/search/${searchTerm}`}</a>
          </Link>
        </p>
        <div className="giphy-search-results-grid">
          {searchResults.map((each, index) => {
            return (
              <div key={index}>
                <h3>{each.title}</h3>
                <img src={each.images.original.url} alt={each.title} />
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=cats&api_key=wLSoAUMd0P7btbJuuj9OGDxz63mQmJIp&limit=10"
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
}
