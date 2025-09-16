export const buildCommentTree = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    c.replies = [];
    map[c.comment_id] = c;
  });

  comments.forEach((c) => {
    if (c.parent_id) {
      map[c.parent_id]?.replies.push(c);
    } else {
      roots.push(c);
    }
  });

  return roots;
};

