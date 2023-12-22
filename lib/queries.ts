"use server";
import { revalidatePath } from "next/cache";
import db from "./db";

export const addAllSectors = async (sectors: { sector: string }[]) => {
  try {
    sectors.forEach(async ({ sector }) => {
      await db.sectors.create({
        data: {
          name: sector,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

// get all sectors
export const getAllSectors = async () => {
  try {
    const sectors = await db.sectors.findMany();
    return { data: sectors, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const addUser = async (newuser:{name:string,sectorId:string,agree:boolean}) => {
    try {
        const newUser = await db.user.create({
        data: {
            name: newuser.name,
            sectorId: newuser.sectorId,
            agree: newuser.agree,
          
        },
        });
        return { data: newUser, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: "Error" };
    }
}

// get specific user
export const getUser = async (id:string) => {
    try {
        const user = await db.user.findUnique({
        where: {
            id,
        },
        include:{
            sector:true
        }
        });
        return { data: user, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: "Error" };
    }
}

// update specific user
export const updateSpecificUser = async (id:string,updateuser:{name:string,sectorId:string,agree:boolean}) => {
    try {
        const user = await db.user.update({
        where: {
            id,
        },
        data: {
            name: updateuser.name,
            sectorId: updateuser.sectorId,
            agree: updateuser.agree,
        },
        });
        revalidatePath(`/users/${id}`);
        return { data: user, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: "Error" };
    }
}