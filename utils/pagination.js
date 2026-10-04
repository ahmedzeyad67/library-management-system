const paginate = async (model, query = {}, options = {}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit),
    model.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export default paginate;
