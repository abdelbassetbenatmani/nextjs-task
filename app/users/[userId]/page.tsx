import { getUser } from "@/lib/queries";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";


interface Props {
  params: any;
}

const UserInfo = async ({ params }: Props) => {
  const { data } = await getUser(params.userId);

  return (
    <Card className="w-[90%] md:w-[500px] mx-auto mt-10">
      
      <CardHeader className="text-center border-b">
      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
        className="mx-auto dark:invert"
      />
        <CardTitle>Your information</CardTitle>
        <CardDescription>You can update each information by click update button</CardDescription>
      </CardHeader>
      <CardContent className=" pt-4 space-y-2">

        <Label className="text-base" >Hi,</Label>
        <p className=" text-xl font-semibold">{data?.name}</p>
        <Label className="text-base" >You are in sector</Label>
        <p className=" text-xl font-semibold">{data?.sector.name}</p>

        <p>{data?.agree ? <p className=" text-xl font-semibold">"You are agree to term"</p>:""}</p>
       
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/users/${data?.id}/update`}>
          <Button variant="outline">Update</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;
