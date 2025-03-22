import { useGetRegionListQuery } from "@/redux/api/regions";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RegionProviderProps {
    children: ReactNode
}

export const RegionProvider: FC<RegionProviderProps> = ({children}) => {
    const { data } = useGetRegionListQuery();
    
    const pathName = usePathname();
    const router = useNavigate();
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
            router("/404");
          }
          break;
        case "/404":
          if (data) {
              router('/talas')
        }

      }
    };

    useEffect(() => {
        handelNavigate()
    }, [data, pathName, router])

    return children
};

