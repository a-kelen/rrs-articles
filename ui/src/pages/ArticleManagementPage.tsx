import React, { useEffect, useState } from 'react';
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from '../api/articles.requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import ArticleManagementList from '../components/ArticleManagementList';
import EditArticleDialog from '../components/EditArticleDialog';
import { Article, SavingMode } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmationDialog from '../components/ConfirmationDialog';

const ArticleManagementPage: React.FC = () => {
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
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage, search, sorting]);

  const { data, isLoading } = useQuery({
    queryKey: ['managementArticles', page, rowsPerPage, search, sorting],
    queryFn: () => getArticles(page, rowsPerPage, search, sorting),
  });

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: createArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['managementArticles'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['managementArticles'] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['managementArticles'] });
    },
  });

  const onSave = async (article: Article, id: string, mode: SavingMode) => {
    if (mode === 'create') {
      try {
        await mutationCreate.mutateAsync(article);
      } catch (error) {
        console.log(error);
      }
    }
    if (mode === 'update') {
      try {
        await mutationUpdate.mutateAsync({ data: article, id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [openEditArticleDialog, setOpenEditArticleDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [editableArticle, setEditableArticle] = useState<Article | undefined>(
    undefined,
  );
  const [deletetionArticleId, setDeletionArticleId] = useState('');

  const onDeleteArticle = (id: string) => {
    setDeletionArticleId(id);
    setOpenConfirmationDialog(true);
  };

  const onEditArticle = (id: string) => {
    setEditableArticle(data?.list.find((x) => x.id === id));
    setOpenEditArticleDialog(true);
  };

  const handleConfirmationDialogClose = async (id: string | null) => {
    setEditableArticle(undefined);
    setOpenConfirmationDialog(false);
    if (id !== null) {
      try {
        await mutationDelete.mutateAsync(id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditArticleDialogClose = () => {
    setEditableArticle(undefined);
    setOpenEditArticleDialog(false);
  };

  const handleCreateClick = () => {
    setOpenEditArticleDialog(true);
  };

  return (
    <div>
      <ConfirmationDialog
        id={deletetionArticleId}
        open={openConfirmationDialog}
        onClose={handleConfirmationDialogClose}
      />
      {openEditArticleDialog && (
        <EditArticleDialog
          article={editableArticle}
          open={openEditArticleDialog}
          onClose={handleEditArticleDialogClose}
          onSave={onSave}
        />
      )}
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
        <Button onClick={handleCreateClick}>Create article</Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <ArticleManagementList
          articles={data?.list}
          onDeleteArticle={onDeleteArticle}
          onEditArticle={onEditArticle}
        />
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

export default ArticleManagementPage;
