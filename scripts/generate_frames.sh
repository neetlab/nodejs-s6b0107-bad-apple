ffmpeg -i ./videos/sm8628149.mp4 \
  -vf "fps=10,scale=w=128:h=64:force_original_aspect_ratio=decrease,pad=128:64:(ow-iw)/2:(oh-ih)/2,format=gray" \
  -an \
  frames/frame_%04d.png
