import React from "react";
import styles from "./CultureGames.module.scss";
import Image from "next/image";
import { useGetGamesQuery } from "@/redux/api/culture";
import useTranslate from "@/appPages/site/hooks/translate/translate";

interface GameProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const Game: React.FC<GameProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <article className={styles.game}>
      <div className={styles.game__imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={styles.game__image}
          width={500} // Укажите подходящий размер для ваших изображений
          height={300} // Укажите подходящий размер для ваших изображений
          layout="responsive" // Можно использовать responsive для адаптивности
        />
      </div>
      <div className={styles.game__content}>
        <h2 className={styles.game__title}>{title}</h2>
        <p className={styles.game__description}>{description}</p>
      </div>
    </article>
  );
};

const GamesPage: React.FC = () => {
  const { data } = useGetGamesQuery();
  const { t } = useTranslate();

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.banner}>
        <h1 className={styles.banner__title}>
          {t("Игры", "الألعاب", "Games")}
        </h1>
        <p className={styles.banner__description}>
          {t(
            "С древних времён кыргызы придавали большое значение народным играм и развлечениям, ни один народный праздник не проходил без них. Традиционные конные игры остаются самыми любимыми и почитаемыми.",
            "منذ العصور القديمة، منح القرغيز أهمية كبيرة للألعاب الشعبية والترفيه، ولم يُقام أي مهرجان شعبي بدونها. تظل الألعاب الفروسية التقليدية الأكثر حبًا واحترامًا.",
            "Since ancient times, the Kyrgyz have given a great place to folk games and entertainment, not a single folk festival took place without them.Traditional equestrian games remain the most beloved and revered"
          )}
        </p>
      </div>

      <main className={styles.games}>
        {data?.map((game, index) => (
          <Game
            key={index}
            title={game.games_name}
            description={game.games_description}
            imageSrc={game.games_image}
            imageAlt={game.games_name}
          />
        ))}
      </main>
    </div>
  );
};

export default GamesPage;
