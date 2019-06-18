import { PureComponent } from 'react';

class OfflineSupport extends PureComponent {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(err => console.dir(err));
    }
  }

  render() {
    return null;
  }
}

export default OfflineSupport;