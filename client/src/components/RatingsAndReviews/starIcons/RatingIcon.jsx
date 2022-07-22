import React from 'react';
import StarIcon from './StarIcon.jsx'

export default function RatingIcon(props) {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;
  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return 'black';
    } else if (!hoverRating && rating >= index) {
      return 'black';
    }
    return 'none';
  }, [rating, hoverRating, index]);
  return (
      <div
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onSaveRating(index)}>
        <StarIcon fill={fill} />
      </div>
  )
}