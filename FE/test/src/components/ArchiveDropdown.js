const ArchiveDropdown = (props) => {
  return (
    <article>
      { props.visibility && props.children }
    </article>
  )
};

export default ArchiveDropdown;
