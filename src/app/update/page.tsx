import { Suspense } from "react";
import SearchComponent from "./(components)/search_component";

const UpdateScreen = () => {
  return (
    <main className="flex min-h-screen justify-center items-center bg-red">
      <Suspense>
        <SearchComponent />
      </Suspense>
    </main>
  );
};

export default UpdateScreen;
