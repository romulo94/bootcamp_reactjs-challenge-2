import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({
      repositories: this.getLocalStorage(),
      loading: false,
    });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositories, repositoryInput } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      if (!repositories.some(el => el.id === repository.id)) {
        repository.lastCommit = moment(repository.pushed_at).fromNow();

        this.setState(
          {
            repositories: [...repositories, repository],
            repositoryInput: '',
            repositoryError: false,
          },
          () => {
            this.setLocalStorage(repository);
          },
        );
      }
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  getLocalStorage = () => JSON.parse(localStorage.getItem('gitCompareRepositories')) || [];

  setLocalStorage = (repository) => {
    const gitCompareRepositories = this.getLocalStorage();
    localStorage.setItem(
      'gitCompareRepositories',
      JSON.stringify([...gitCompareRepositories, repository]),
    );
  };

  handleRemoveRepository = (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    localStorage.setItem('gitCompareRepositories', JSON.stringify(updatedRepositories));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('gitCompareRepositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="logo" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
            type="text"
            placeholder="usuário/repositorio"
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.handleRemoveRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}
