import React, { useState } from 'react';
import ArticlePublicList from '../components/ArticlePublicList';
import { getArticles } from '../api/articles.requests';
import { useQuery } from '@tanstack/react-query';
import {
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';

const ArticlesPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sorting, setSorting] = useState<string>('desc');
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as string);
  };

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(searchTerm);
    }
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['publicArticles', page, rowsPerPage, search, sorting],
    queryFn: () => getArticles(page, rowsPerPage, search, sorting),
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Articles
      </Typography>
      <Stack direction="row" spacing={{ xs: 2 }}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchEnter}
        />
        <Select defaultValue="desc" label="Sort" onChange={handleSortChange}>
          <MenuItem value="desc">Descending</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
        </Select>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <ArticlePublicList articles={data?.list} />
      )}
      <TablePagination
        component="div"
        count={data?.totalCount || 0}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default ArticlesPage;
