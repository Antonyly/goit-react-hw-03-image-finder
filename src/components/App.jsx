import { Component } from "react";

import s from './app.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import { getPhotos } from '../shared/services/services';


export default class App extends Component {
  state = {
    items: [],
    loading: false,
    querry: '',
    page: 1,
    modalOpen: false,
    modalContent: {},
    error: null,
  };


      componentDidUpdate(_, prevState) {
        const { page, querry } = this.state;
        if (page > prevState.page || querry !== prevState.querry) {
            this.fetchPhotos();
        }
      }

  async fetchPhotos() {
        this.setState({
          loading: true,
          error: null,
        })
        const { querry, page } = this.state;
        try {
          const data = await getPhotos(querry, page);
           const totalPages = Math.ceil(data.totalHits / 12);

            this.setState(({ items }) => {
                return {
                  items: [...items, ...data.hits],
                }
            })
          if ( data.hits.length === 0) {
          return toast.error('Sorry, no images found');
          }
          if (page === totalPages) {
          toast.info("These are all pictures. Try entering something else in the field!");
        }
        } catch (error) {
            this.setState({
              error: error,
            })
        } finally {
      this.setState({ loading: false });
    }
    }

  changeQuerry = ({ querry }) => {
    if (this.state.querry !== querry) {
      this.setState({
        querry,
        items: [],
        page: 1

      });
    };
  };

  loadMore = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1
            }
        })
    }

  showModal = (url, tags) => {
    this.setState({
      modalOpen: true,
      modalContent: {
        src: url,
        alt: tags,
      },
    });
  };
  
  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };
  
  render() {
    const { items, loading, error, modalOpen, modalContent} = this.state;
    const { loadMore, changeQuerry, showModal, closeModal } = this;


    return (
      <div className={s.app}>
      {modalOpen && (
          <Modal closeModal={closeModal}>
            <img
              src={modalContent.src}
              alt={modalContent.alt}
            />
          </Modal>
        )}
        <Searchbar onSubmit={changeQuerry} />
        {  error && <h2>The gallery is empty</h2>}

        
        {!error && (
         <ImageGallery onClick={showModal} items={items} />
        )}
        {loading && <Loader />}
        {!loading && items.length >= 12 && <Button onClick={loadMore} text="Load more" />}
        <ToastContainer position="top-right" autoClose={5000} theme="dark"/>
      </div>
    );
  }
}
