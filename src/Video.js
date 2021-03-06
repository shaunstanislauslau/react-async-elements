import React from 'react';
import { createResource } from 'simple-cache-provider';
import { cache, waitForReadyState } from './shared';

function load(attributes) {
  const { src, ...attrs } = attributes;
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = src;
    Object.keys(attrs).forEach(name => video.setAttribute(name, attrs[name]));
    waitForReadyState(video, resolve.bind(null, src));
  });
}

const resource = createResource(load, ({ src }) => src);

export const Video = ({ cache, ...props }) => {
  resource.read(cache, props);
  return <video {...props} />;
};

Video.defaultProps = {
  cache,
};
