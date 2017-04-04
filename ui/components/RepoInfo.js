import React from 'react';
import TimeAgo from 'react-timeago';
import { emojify } from 'node-emoji';
import { propType } from 'graphql-anywhere';
import REPO_INFO_FRAGMENT from '../graphql/RepoInfoFragment.graphql';

import InfoLabel from './InfoLabel';

const RepoInfo = ({
  entry: {
    createdAt,
    repository: {
      description,
      stargazers_count,
      open_issues_count,
    },
    postedBy: {
      html_url,
      login,
    },
  },
  children,
}) => (
  <div>
    <p>
      {description && emojify(description)}
    </p>
    <p>
      <InfoLabel
        label="Stars"
        value={stargazers_count}
      />
      &nbsp;
      <InfoLabel
        label="Issues"
        value={open_issues_count}
      />
      &nbsp;
      {children}
      &nbsp;&nbsp;&nbsp;
      Submitted&nbsp;
      <TimeAgo
        date={createdAt}
      />
      &nbsp;by&nbsp;
      <a href={html_url}>{login}</a>
    </p>
  </div>
);

RepoInfo.fragments = {
  entry: REPO_INFO_FRAGMENT,
};

RepoInfo.propTypes = {
  entry: propType(RepoInfo.fragments.entry).isRequired,
  children: React.PropTypes.node,
};

export default RepoInfo;
