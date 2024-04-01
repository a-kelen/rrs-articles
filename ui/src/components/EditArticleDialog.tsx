import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Article, SavingMode } from '../types';
import moment from 'moment';

interface EditArticleDialogProps {
  open: boolean;
  onClose: () => void;
  article?: Article;
  onSave: (editedArticle: Article, id: string, mode: SavingMode) => void;
}

type FormValues = {
  title: string;
  content: string;
  author: string;
  link: string;
  articleId: string;
};

const EditArticleDialog: React.FC<EditArticleDialogProps> = ({
  open,
  onClose,
  article,
  onSave,
}) => {
  const savingMode: SavingMode = !!article ? 'update' : 'create';
  const isUpdatingMode = savingMode === 'update';

  const localArticle = useMemo(() => {
    return isUpdatingMode
      ? { ...article }
      : ({
          updated: new Date(),
          published: new Date(),
          link: '',
          articleId: '',
          author: '',
          title: '',
          content: '',
        } as Article);
  }, [article]);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const editedArticle: any = {
      ...localArticle,
      link: data.link,
      articleId: data.articleId,
      title: data.title,
      content: data.content,
      author: data.author,
    };
    onSave(editedArticle as Article, editedArticle.id, savingMode);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <DialogTitle>Edit Article</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register('title')}
            label="Title"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={article?.title || ''}
            required
          />
          <TextField
            {...register('content')}
            label="Content"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={article?.content || ''}
            required
          />
          <TextField
            {...register('author')}
            label="Author"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={article?.author || ''}
            required
          />
          <TextField
            {...register('link')}
            label="Link"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={article?.link || ''}
            required
            disabled={isUpdatingMode}
          />
          <TextField
            {...register('articleId')}
            label="Article ID"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue={article?.articleId || ''}
            required
            disabled={isUpdatingMode}
          />
          <TextField
            label="Published"
            variant="outlined"
            margin="normal"
            fullWidth
            value={moment(article?.published).format('MMMM Do YYYY, h:mm:ss a')}
            disabled
          />
          <TextField
            label="Updated"
            variant="outlined"
            margin="normal"
            fullWidth
            value={moment(article?.updated).format('MMMM Do YYYY, h:mm:ss a')}
            disabled
          />
          <TextField
            label="Saved"
            variant="outlined"
            margin="normal"
            fullWidth
            value={moment(article?.savedUTC).format('MMMM Do YYYY, h:mm:ss a')}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditArticleDialog;
