"use client"; // Добавь, если ещё не указано
import { useGetRegionListQuery } from "@/redux/api/regions";
import { usePathname, useRouter } from "next/navigation"; // Замени useNavigate на useRouter
import { FC, ReactNode, useEffect } from "react";

interface RegionProviderProps {
    children: ReactNode
}

export const RegionProvider: FC<RegionProviderProps> = ({children}) => {
    const { data } = useGetRegionListQuery();
    const pathName = usePathname();
    const router = useRouter(); // Используем useRouter из Next.js

    const handelNavigate = () => {
      switch (pathName) {
        case "/talas":
        case "/chui":
        case "/issyk-kyl":
        case "/jalal-abad":
        case "/naryn":
        case "/osh":
        case "/batken":
          if (!data) {
            router.push("/404"); // Используем .push для навигации
          }
          break;
        case "/404":
          if (data) {
            router.push('/talas'); // Используем .push для навигации
          }
          break;
      }
    };

    useEffect(() => {
        handelNavigate();
    }, [data, pathName, router]);

    return children;
};