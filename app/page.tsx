import AddUser from "@/components/User/AddUser";

import { getAllSectors } from "@/lib/queries";
import Image from "next/image";

export default async function Home() {
  // get All sector from database
  const { data } = await getAllSectors();

  return (
    <div className=" h-full w-[90%] md:w-[500px] mx-auto mt-10 px-4">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="mx-auto dark:invert"
      />
      <AddUser sectors={data} />

    </div>
  );
}
