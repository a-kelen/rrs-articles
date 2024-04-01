import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { Article } from '../types';
import moment from 'moment';
import dompurify from 'dompurify';

export interface ArticleListProps {
  articles?: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {articles?.map((article) => (
          <Card key={article.id} style={{ margin: '10px', minWidth: '300px' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {article.title}
              </Typography>
              <Stack
                sx={{ my: 1 }}
                direction="row"
                useFlexGap
                spacing={{ xs: 2 }}
              >
                <Chip
                  label={`Published: ${moment(article.published).format('MMMM Do YYYY, h:mm:ss a')}`}
                ></Chip>
                <Chip
                  label={`Updated: ${moment(article.updated).format('MMMM Do YYYY, h:mm:ss a')}`}
                ></Chip>
              </Stack>
              <Chip
                sx={{ my: 1 }}
                color="primary"
                label={article.author}
              ></Chip>
              <Typography variant="body2" component="p">
                <div
                  dangerouslySetInnerHTML={{
                    __html: dompurify.sanitize(article.content),
                  }}
                ></div>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
