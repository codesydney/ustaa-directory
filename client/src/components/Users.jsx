import User from './search/User'

const Users = ({ users, meta, onPageChange }) => {
  return (
    <div
      style={{
        maxWidth: '1444px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(325px, 1fr)',
          columnGap: '2rem',
          rowGap: '1.6rem',
        }}
      >
        {users.length > 0 ? (
          users.map((user, index) => <User user={user} key={index} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {users.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => onPageChange(meta.page - 1)}
            disabled={meta.page <= 1}
          >
            Previous
          </button>
          <span>
            Page {meta.page} of {meta.totalPages}{' '}
          </span>
          <button
            onClick={() => onPageChange(meta.page + 1)}
            disabled={meta.page >= meta.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Users
