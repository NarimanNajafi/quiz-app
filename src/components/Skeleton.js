import classNames from 'classnames';

const Skeleton = ({ className, show, children, ...props }) => (
  <div
    data-placeholder
    class={classNames(
      { 'flex overflow-hidden relative bg-gray-200 mr-1': show },
      className
    )}
    {...props}
    children={show ? undefined : children}
  />
);

export default Skeleton;
