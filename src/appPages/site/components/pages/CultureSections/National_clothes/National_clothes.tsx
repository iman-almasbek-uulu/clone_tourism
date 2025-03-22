import useTranslate from "@/appPages/site/hooks/translate/translate";
import styles from "./National_clothes.module.scss";
import { useGetCultureNationalClothesQuery } from "@/redux/api/culture";

const National_clothes = () => {
  const { t } = useTranslate();
  const { data, isError } = useGetCultureNationalClothesQuery();

  if (isError) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>
            {t("Национальные одежды", "الملابس الوطنية", "National clothes")}
          </h1>
          <p className={styles["top-paragraph"]}>
            {t(
              "Кочевой образ жизни отражен в кыргызской одежде, видны особенности различных регионов. Преобладают натуральные материалы: шерсть, войлок, кожа, грубые ткани. В дизайне используются орнаменты и темы, вдохновленные природой и племенными традициями.",
              "ينعكس نمط الحياة البدوي في الملابس القرغيزية، وتظهر ملامح المناطق المختلفة. تسود المواد الطبيعية: الصوف، واللباد، والجلد، والأقمشة الخشنة. يستخدم التصميم الزخارف والموضوعات المستوحاة من الطبيعة والتقاليد القبلية.",
              "The nomadic way of life is reflected in the Kyrgyz clothes, the features of various regions are visible. Natural materials prevail: wool, felt, leather, coarse fabrics. The design uses ornaments and themes inspired by nature and tribal traditions."
            )}
          </p>
        </div>
        {data?.map((el, idx) => (
          <div key={idx} className={styles.main}>
            <div
              className={styles.img}
              style={{
                background: `url(${el.clothes_image}) center/cover no-repeat`,
              }}
            ></div>
            <div className={styles["main-text"]}>
              <h3 className={styles["main-heading"]}>{el.clothes_name}</h3>
              <p className={styles["main-paragraph"]}>
                {el.clothes_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default National_clothes;