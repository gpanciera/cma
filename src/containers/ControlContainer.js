/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect, useRef } from 'react';
import { string, func, number } from 'prop-types';
import { Pagination, TextField } from '@material-ui/core';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import mediaQueries from '../styles/mediaQueries';
import Filters from '../components/Filters';
import { RESULTS_PER_PAGE } from '../constants/constants';

export default function ControlContainer({ dispatchQueryUpdate, filterName, numResults, curPage }) {
  const [searchText, setSearchText] = useState('');
  const [userSubmittedSearch, setUserSubmittedSearch] = useState(false);
  const isFirstRender = useRef(true);

  const handlePageChange = (e, num) => {
    dispatchQueryUpdate({ type: 'UPDATE_PAGE', payload: num });
  };

  const handleResetSearch = () => {
    setSearchText('');
    dispatchQueryUpdate({ type: 'RESET_ALL' });
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape': {
        setSearchText('');
        setUserSubmittedSearch(true);
        break;
      }
      case 'Enter': {
        setUserSubmittedSearch(true);
        break;
      }
    }
  };

  // If user hit enter or cleared contents of search field, send updated search string to parent
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    else {
      if (userSubmittedSearch || searchText.length === 0) {
        const cleanedString = DOMPurify.sanitize(searchText);
        dispatchQueryUpdate({ type: 'UPDATE_SEARCH', payload: cleanedString });
      }
      setUserSubmittedSearch(false);
    }
  }, [searchText, userSubmittedSearch]);

  return (
    <>
      <SearchWrapper>
        <StyledTextField
          fullWidth
          value={searchText}
          label="Search by title, artist, country, dept. etc..."
          margin="normal"
          variant="outlined"
          type="search"
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
      </SearchWrapper>
      <FilterAndPaginationWrapper>
        <Filters
          dispatchQueryUpdate={dispatchQueryUpdate}
          selectedFilter={filterName}
          handleResetSearch={handleResetSearch}
        />
        <StyledPagination
          siblingCount={1}
          count={Math.floor(numResults / RESULTS_PER_PAGE)}
          page={curPage}
          onChange={handlePageChange}
          shape="rounded"
          variant="outlined"
        />
      </FilterAndPaginationWrapper>
    </>
  );
}

const StyledTextField = styled(TextField)`
  border: '1px solid #000000';
`;

const SearchWrapper = styled.div`
  padding: 0.6em 1em 0em 1em;
  ${mediaQueries('md')`
    padding: 0.8em 2.5em 0em 2.5em;
  `};
`;

const FilterAndPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6.5rem;
  ${mediaQueries('sm')`
    height: 4rem;
    flex-direction: row;
    justify-content: start;
  `};

  ${mediaQueries('md')`
    height: 4rem;
    flex-direction: row;
    justify-content: start;
  `};
`;

// const PaginationContainer = styled.div`
// `;

const StyledPagination = styled(Pagination)`
  margin: 0.5rem 0 0 0.5rem;
  ${mediaQueries('sm')`
    margin-left: auto;
    margin-right: 2.5rem;
    margin-top: 4px;
    margin-bottom: 0;
  `};
`;

ControlContainer.propTypes = {
  filterName: string.isRequired,
  numResults: number.isRequired,
  curPage: number.isRequired,
  dispatchQueryUpdate: func.isRequired,
};
