/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import ArtDetails from './ArtDetails';
import { ROW_LAYOUT_DETAILS_WIDTH_REM, COL_LAYOUT_DETAILS_HEIGHT_REM } from '../other/constants';

export default function ModalContent({ id, artworkMap, imgWidth = 0, imgHeight = 0, rowLayoutOptimal = true }) {
  if (!artworkMap.current.has(id)) return null;
  const details = artworkMap.current.get(id);
  const { url, width, height } = details.images.web;
  const aspect = width / height;
  return (
    <ModalWrapper aspect={aspect} rowLayoutOptimal={rowLayoutOptimal}>
      <Image
        src={url}
        alt={details.title}
        style={{ width: imgWidth, height: imgHeight }}
        rowLayoutOptimal={rowLayoutOptimal}
      />
      <InfoContainer
        imgHeight={imgHeight}
        imgWidth={imgWidth}
        rowLayoutOptimal={rowLayoutOptimal}
        aspect={aspect}
      >
        <ArtDetails details={details} />
      </InfoContainer>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.rowLayoutOptimal ? 'row' : 'column')};
`;

const Image = styled.img`
  display: block;
  flex: none;
  margin: ${props => (props.rowLayoutOptimal ? '0 1rem 0 0' : '0 0 1rem 0')};
  @media (max-width: 600px) {
    display: none;
  }
`;

const InfoContainer = styled.div`
  overflow: auto;
  ${props => {
    if (props.rowLayoutOptimal) {
      return (`
        flex: 0 0 ${ROW_LAYOUT_DETAILS_WIDTH_REM}rem;
        width: ${ROW_LAYOUT_DETAILS_WIDTH_REM}rem; 
        min-width: ${ROW_LAYOUT_DETAILS_WIDTH_REM}rem; 
        max-width: ${ROW_LAYOUT_DETAILS_WIDTH_REM}rem;
        height: ${props.imgHeight};
      `);
    }
    return (`
      flex: 0 0 ${COL_LAYOUT_DETAILS_HEIGHT_REM}rem;
      column-width: 18rem; 
      column-fill: balance-all;
      width: ${props.imgWidth};
    `);
  }}
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    height: 100%;
    width: 100%;
  }
`;

ModalContent.propTypes = {
  id: number.isRequired,
};

// const ModalWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   @media (min-width: 600px) {
//     flex-direction: ${props => ((props.aspect < 1) ? 'row' : 'column')};
//   }
// `;

// const Image = styled.img`
// display: none;
// @media (min-width: 600px) {
//   display: block;
//   ${props => ((props.aspect < 1) ? 'height: 85vh;' : 'width: 100%;')}
//   margin: ${props => ((props.aspect < 1) ? '0 1em 0 0' : '0 0 1em 0')};
// }
// `;

// const InfoContainer = styled.div`
//   @media (min-width: 600px) {
//     ${props => ((props.aspect < 1) ? 'width: 20rem;' : 'column-width: 18rem;')}
//     ${props => ((props.aspect < 1) ? 'min-width: 20rem;' : 'column-fill: balance-all;')}
//   }
// `;

// const ModalWrapper = styled.div`
//   display: flex;
//   flex-direction: ${props => ((props.aspect < 1) ? 'row' : 'column')};
// `;

// const Image = styled.img`
//   display: block;
//   /* max-height: calc(${props => props.aspect} * 90vw); */
//   ${props => ((props.aspect < 1) ? 'height: 85vh;' : 'width: 100%;')}
//   margin: ${props => ((props.aspect < 1) ? '0 1em 0 0' : '0 0 1em 0')};
// `;

// const InfoContainer = styled.div`
//   ${props => ((props.aspect < 1) ? 'width: 20rem;' : 'column-width: 18rem;')}
//   ${props => ((props.aspect < 1) ? 'min-width: 20rem;' : 'column-fill: balance-all;')}
// `;
