import UpdateUser from "@/components/User/UpdateUser";
import { getAllSectors, getUser } from "@/lib/queries";
import Image from "next/image";

interface Props {
  params: any;
}

const UpdateUserPage = async ({ params }: Props) => {
  // get All sector from database
  const { data: sectorsData } = await getAllSectors();
  const { data: userData } = await getUser(params.userId);

  return (
    <div className=" h-full w-[90%] md:w-[500px] mx-auto mt-10 px-4">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="mx-auto dark:invert"
      />
      <UpdateUser sectors={sectorsData} user={userData} />
    </div>
  );
};

export default UpdateUserPage;
