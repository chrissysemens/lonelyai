import React from 'react';
import styles from './MarkdownDisplay.module.scss';
import Markdown from 'react-markdown';

type Props = {
    header: string;
    markdown: string;
}
export const MarkdownDisplay = ({header, markdown}: Props) => {
    return (
        <div className={styles.markdown}>
        <div className={styles.header}>
            {header}
        </div>
        <Markdown>{markdown}</Markdown>
        </div>
    )

}