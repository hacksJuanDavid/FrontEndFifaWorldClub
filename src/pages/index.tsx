import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  //Create interface for clubs
  interface Club {
    id: number;
    name: string;
    country: string;
    continent: string;
    club: string;
    year: number;
    position: number;
    points: number;
    goals: number;
    image: string;
  }

  //Data estado
  const [clubs, setClubs] = useState<Club[]>([]);

  //Data de la API using UseEffect
  useEffect(() => {
    async function loadClubs() {
      try {
        const response = await fetch("http://localhost:8000/clubs");
        const data = await response.json();
        console.log(data);
        setClubs(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadClubs();
  }, []);

  try {
    return (
      <>
        {/* Header */}
        <header className="flex items-center justify-center w-full h-24 border-b">
          <h1 className="text-4xl font-bold text-blue-600">FIFA World Club</h1>
        </header>

        {/* Hero */}
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url("/images/backgroundFifa.png")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <Image
              src="/images/logoCopa.png"
              alt="FIFA World Club"
              width={200}
              height={200}
              priority //Carga la imagen primero
            />
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Welcome FIFA World Club Estadistics
              </h1>
              <p className="mb-5">
                This is an application which generates statistics of the soccer
                clubs that belong to FIFA, which will allow us to know more
                about the most important soccer clubs in the world.
              </p>
              <button className="btn bg-blue-700">Get Started</button>
            </div>
          </div>
        </div>

        {/* Create carousel cards of clubs */}
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Fifa Clubs
          </h2>
          <div className="flex flex-wrap justify-center">
            {clubs.map((club) => (
              <div
                className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3"
                key={club.id}
              >
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="bg-cover bg-center h-56 p-4">
                    <Image
                      src={club.image}
                      alt={club.name}
                      width={200}
                      height={200}
                      priority //Carga la imagen primero
                    />
                  </div>
                  <div className="p-4">
                    <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                      {club.name}
                    </p>
                    <li className="text-gray-900">Country: {club.country}</li>
                    <li className="text-gray-900">Continent: {club.continent}</li>
                    <li className="text-gray-900">Club: {club.club}</li>
                    <li className="text-gray-900">Year: {club.year}</li>
                    <li className="text-gray-900">Position: {club.position}</li>
                    <li className="text-gray-900">Poinst: {club.points}</li>
                    <li className="text-gray-900">Goals: {club.goals}</li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-center w-full h-24 border-t">
          <p className="text-center text-gray-600">
            Powered by{" "}
            <a
              className="text-blue-600"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juan David Jimenez
            </a>
          </p>
        </footer>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
