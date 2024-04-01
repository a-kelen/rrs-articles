import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { Article } from '../types';
import moment from 'moment';

interface ArticleListProps {
  articles?: Article[];
  onEditArticle: (id: string) => void;
  onDeleteArticle: (id: string) => void;
}

const ArticleManagementList: React.FC<ArticleListProps> = ({
  articles,
  onEditArticle,
  onDeleteArticle,
}) => {
  return (
    <div>
      {articles?.map((article) => (
        <Card key={article.id} style={{ margin: '10px' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <div>
                <Typography variant="h6" component="h2">
                  {article.title}
                </Typography>
                <Typography color="textSecondary">
                  Author: {article.author}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Published:{' '}
                  {moment(article.published).format('MMMM Do YYYY, h:mm:ss a')},
                  Updated:{' '}
                  {moment(article.updated).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
              </div>
              <Stack>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onEditArticle(article.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDeleteArticle(article.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArticleManagementList;
