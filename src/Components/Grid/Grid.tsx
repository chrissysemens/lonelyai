import React, { ReactNode } from "react";
import styles from "./Grid.module.scss";

type Props = {
  headers?: Array<string | number>;
  rows?: Array<Row>;
};

type Row = {
  values: Array<string | ReactNode>;
};

export const Grid = ({ headers = [], rows = [] }: Props) => {
  return (
    <div className={styles.grid}>
      <div className={styles.headers}>
        {headers ? (
          headers.map((header: string | number, col: number) => (
            <div key={col} className={styles.column}>
              <div className={styles.header}>{header}</div>
              <div className={styles.rows}>
                {rows ? (
                  rows.map((row: Row, i: number) => (
                    <div key={i} className={styles.row}>
                        {row.values[col]}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
