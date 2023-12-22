"use client";
import { Button } from "@/components/ui/button";

import { selectBoxData } from "@/constant";

import { addAllSectors } from "@/lib/queries";

const AddAllSector = () => {
  
  const onSubmit = async () => {
    try {
      await addAllSectors(selectBoxData)
    } catch (error) {
        console.log(error);
        
    }
  }


  
  return (
    <form  action={onSubmit}>
      <Button>Create Sectors</Button>
    </form>
  );
};

export default AddAllSector;
