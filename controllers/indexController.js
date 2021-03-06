const _ = require('lodash');
const { root } = require('../mock-data/data');

const children = 'children';

exports.getData = async (req, res, next) => {
  // get path after /api/files
  const { path } = req;

  try {
    // convert path to array and append children
    // eg.['root', 'children', 'home', 'children']
    const pathArray = path
      .split('/')
      .filter(p => p !== '')
      .reduce((acc, curr) => {
        acc.push(curr);
        acc.push(children);
        return acc;
      }, []);

    // remove first 'root'
    pathArray.shift();

    // get last children
    // const result = root.children.home.children.myname.children;
    const result = _.get(root, pathArray, {});

    // convert last children to array
    const name = Object.keys(result);
    const childrenArray = name.map(n => {
      const container = {};
      const { type } = result[n];
      // default .txt for files don't have file extinction
      container.name = !n.includes('.') && type === 'file' ? `${n}.txt` : n;
      container.type = type;
      return container;
    });

    return res.status(200).json(childrenArray);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong', error });
  }
};
