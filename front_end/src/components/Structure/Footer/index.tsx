import React from "react";
import GitInfo, { GitInformation } from 'react-git-info/macro';
import * as S from './styled';

const Menu: React.FC = (): React.ReactElement => {
  // Display the footer of the page
  function get_version(): string {
    let git_version: GitInformation;
    try{
      git_version = GitInfo();
    }catch{
      git_version = {
        tags: [],
        commit: {
          hash: '',
          shortHash: '',
          date: '',
          message: ''
        }
      };
    }
    return "v1.0.0."+
      git_version.commit.shortHash + " / " +
      git_version.commit.date;
  }

  return (
    <S.FooterWrapper>
      For further information, contact FAC or SwC.
      <br/>
      {get_version()}
    </S.FooterWrapper>
  );
};

export default Menu;
