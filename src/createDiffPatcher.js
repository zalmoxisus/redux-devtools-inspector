import { DiffPatcher } from 'jsondiffpatch/src/diffpatcher';

const defaultObjectHash = (o, idx) =>
  o === null && '$$null' ||
  o && (o.id || o.id === 0) && `$$id:${JSON.stringify(o.id)}` ||
  o && (o._id ||o._id === 0) && `$$_id:${JSON.stringify(o._id)}` ||
  '$$index:' + idx;

const isSeen = (name, context, seenProps) => {
  const nameNodes = seenProps[name];
  if (nameNodes && nameNodes.length) {
    const matchIndex = nameNodes.findIndex(
      item => item.left === context.left && item.right === context.right
    );
    if (matchIndex !== -1) {
      return true;
    } else {
      nameNodes.push({ left: context.left, right: context.right });
    }
    return false;
  }
  seenProps[name] = [{ left: context.left, right: context.right }];
};

const defaultPropertyFilter = (name, context, seenProps) =>
  typeof context.left[name] !== 'function' &&
  typeof context.right[name] !== 'function' &&
  !isSeen(name, context, seenProps);

const defaultDiffPatcher = (seenProps) => new DiffPatcher({
  arrays: { detectMove: false },
  objectHash: defaultObjectHash,
  propertyFilter: (name, context) => defaultPropertyFilter(name, context, seenProps)
});

export default function createDiffPatcher(objectHash, propertyFilter) {
  const seenProps = {};

  if (!objectHash && !propertyFilter) {
    return defaultDiffPatcher(seenProps);
  }
  return new DiffPatcher({
    arrays: { detectMove: false },
    objectHash: objectHash || defaultObjectHash,
    propertyFilter: propertyFilter || defaultPropertyFilter
  });
}
