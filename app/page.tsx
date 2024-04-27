import { Filters } from "../components/main-page/filters";
import { Products } from "@/components/main-page/products";
import styles from './page.module.scss';

export default function Home() {
  return (
    <section className="container">
      <div className={ styles.main }>
        <Filters />
        <Products />
      </div>
    </section>
  )
};
