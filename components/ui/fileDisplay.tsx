import { DeleteIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { SVGProps } from "react";

export default function FileDisplay({
  fullName,
  extension,
  sizeWithUnit,
  fileId,
  addDeleteLink,
  addDownloadLink,
}: {
  fullName: string;
  extension: string;
  sizeWithUnit?: string;
  fileId: string;
  addDownloadLink?: boolean;
  addDeleteLink?: boolean;
}) {
  // icons found one svgrepo.com or directly from v0
  const iconsList = {
    default: <FileIcon className="h-8 w-8 text-muted" />,

    csv: <FileSpreadsheetIcon className="h-8 w-8 text-muted" />,
    xls: <FileSpreadsheetIcon className="h-8 w-8 text-muted" />,
    xlsx: <FileSpreadsheetIcon className="h-8 w-8 text-muted" />,

    jpg: <FileImageIcon className="h-8 w-8 text-muted" />,
    jpeg: <FileImageIcon className="h-8 w-8 text-muted" />,
    png: <FileImageIcon className="h-8 w-8 text-muted" />,
    gif: <FileImageIcon className="h-8 w-8 text-muted" />,
    img: <FileImageIcon className="h-8 w-8 text-muted" />,
    svg: <FileImageIcon className="h-8 w-8 text-muted" />,

    audio: <FileAudioIcon className="h-8 w-8 text-muted" />,
    mp3: <FileAudioIcon className="h-8 w-8 text-muted" />,
    wav: <FileAudioIcon className="h-8 w-8 text-muted" />,

    mp4: <FileVideoIcon className="h-8 w-8 text-muted" />,
    video: <FileVideoIcon className="h-8 w-8 text-muted" />,
    avi: <FileVideoIcon className="h-8 w-8 text-muted" />,
    mov: <FileVideoIcon className="h-8 w-8 text-muted" />,

    js: <CodeFileIcon className="h-8 w-8 text-muted" />,
    jsx: <CodeFileIcon className="h-8 w-8 text-muted" />,
    ts: <CodeFileIcon className="h-8 w-8 text-muted" />,
    tsx: <CodeFileIcon className="h-8 w-8 text-muted" />,
    html: <CodeFileIcon className="h-8 w-8 text-muted" />,
    css: <CodeFileIcon className="h-8 w-8 text-muted" />,
    json: <CodeFileIcon className="h-8 w-8 text-muted" />,
    xml: <CodeFileIcon className="h-8 w-8 text-muted" />,

    txt: <TxtIcon className="h-8 w-8 text-muted" />,
    pdf: <PdfIcon className="h-8 w-8 text-muted" />,
    docx: <DocxIcon className="h-8 w-8 text-muted" />,
    doc: <DocxIcon className="h-8 w-8 text-muted" />,
    pptx: <PptxIcon className="h-8 w-8 text-muted" />,

    zip: <ArchiveFileIcon className="h-8 w-8 text-muted" />,
    rar: <ArchiveFileIcon className="h-8 w-8 text-muted" />,
    tar: <ArchiveFileIcon className="h-8 w-8 text-muted" />,
    gz: <ArchiveFileIcon className="h-8 w-8 text-muted" />,
  };

  return (
    <div
      className="group rounded-lg border bg-background p-4 transition-all"
      data-file-id={fileId}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 pr-2">
          {(iconsList as Record<string, any>)[extension.toLowerCase()] ??
            iconsList["default"]}
          <div>
            <p className="text-sm font-medium">{fullName}</p>
            <p className="text-xs text-secondary-foreground select-none">
              {extension.toUpperCase()}{" "}
              {sizeWithUnit ? ", " + sizeWithUnit : ""}
            </p>
          </div>
        </div>
        <div className="space-x-4">
          {addDownloadLink ? (
            <Link
              href={"/files/download/" + fileId}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors duration-500 hover:shadow-lg hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-hover:bg-accent group-hover:text-accent-foreground"
              prefetch={false}
            >
              <DownloadIcon className="h-4 w-4 text-black" />
            </Link>
          ) : (
            ""
          )}
          {addDeleteLink ? (
            <Link
              href={"/files/delete/" + fileId}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors duration-500 hover:shadow-lg hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-hover:bg-accent group-hover:text-accent-foreground"
              prefetch={false}
            >
              <Trash2Icon className="h-4 w-4 text-black" />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

function PdfIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V11C19 11.5523 19.4477 12 20 12C20.5523 12 21 11.5523 21 11V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM10.3078 23.5628C10.4657 23.7575 10.6952 23.9172 10.9846 23.9762C11.2556 24.0316 11.4923 23.981 11.6563 23.9212C11.9581 23.8111 12.1956 23.6035 12.3505 23.4506C12.5941 23.2105 12.8491 22.8848 13.1029 22.5169C14.2122 22.1342 15.7711 21.782 17.287 21.5602C18.1297 21.4368 18.9165 21.3603 19.5789 21.3343C19.8413 21.6432 20.08 21.9094 20.2788 22.1105C20.4032 22.2363 20.5415 22.3671 20.6768 22.4671C20.7378 22.5122 20.8519 22.592 20.999 22.6493C21.0755 22.6791 21.5781 22.871 22.0424 22.4969C22.3156 22.2768 22.5685 22.0304 22.7444 21.7525C22.9212 21.4733 23.0879 21.0471 22.9491 20.5625C22.8131 20.0881 22.4588 19.8221 22.198 19.6848C21.9319 19.5448 21.6329 19.4668 21.3586 19.4187C21.11 19.3751 20.8288 19.3478 20.5233 19.3344C19.9042 18.5615 19.1805 17.6002 18.493 16.6198C17.89 15.76 17.3278 14.904 16.891 14.1587C16.9359 13.9664 16.9734 13.7816 17.0025 13.606C17.0523 13.3052 17.0824 13.004 17.0758 12.7211C17.0695 12.4497 17.0284 12.1229 16.88 11.8177C16.7154 11.4795 16.416 11.1716 15.9682 11.051C15.5664 10.9428 15.1833 11.0239 14.8894 11.1326C14.4359 11.3004 14.1873 11.6726 14.1014 12.0361C14.0288 12.3437 14.0681 12.6407 14.1136 12.8529C14.2076 13.2915 14.4269 13.7956 14.6795 14.2893C14.702 14.3332 14.7251 14.3777 14.7487 14.4225C14.5103 15.2072 14.1578 16.1328 13.7392 17.0899C13.1256 18.4929 12.4055 19.8836 11.7853 20.878C11.3619 21.0554 10.9712 21.2584 10.6746 21.4916C10.4726 21.6505 10.2019 21.909 10.0724 22.2868C9.9132 22.7514 10.0261 23.2154 10.3078 23.5628ZM11.8757 23.0947C11.8755 23.0946 11.8775 23.0923 11.8824 23.0877C11.8783 23.0924 11.8759 23.0947 11.8757 23.0947ZM16.9974 19.5812C16.1835 19.7003 15.3445 19.8566 14.5498 20.0392C14.9041 19.3523 15.2529 18.6201 15.5716 17.8914C15.7526 17.4775 15.9269 17.0581 16.0885 16.6431C16.336 17.0175 16.5942 17.3956 16.8555 17.7681C17.2581 18.3421 17.6734 18.911 18.0759 19.4437C17.7186 19.4822 17.3567 19.5287 16.9974 19.5812ZM16.0609 12.3842C16.0608 12.3829 16.0607 12.3823 16.0606 12.3823C16.0606 12.3822 16.0607 12.3838 16.061 12.3872C16.061 12.386 16.0609 12.385 16.0609 12.3842Z"
        fill="#000000"
      />
    </svg>
  );
}

function DocxIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      version="1.1"
      id="Capa_1"
      width="24"
      height="24"
      viewBox="0 0 548.291 548.291"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <g>
          <path d="M472.929,131.385c-0.031-2.514-0.839-4.992-2.566-6.96L364.656,3.667c-0.031-0.029-0.062-0.044-0.084-0.07    c-0.63-0.709-1.365-1.284-2.142-1.795c-0.231-0.149-0.463-0.29-0.704-0.42c-0.672-0.37-1.376-0.667-2.121-0.888    c-0.2-0.058-0.377-0.144-0.577-0.186C358.231,0.113,357.4,0,356.561,0H96.757C84.904,0,75.255,9.644,75.255,21.502V526.79    c0,11.854,9.649,21.501,21.502,21.501h354.775c11.853,0,21.503-9.647,21.503-21.501v-394.2    C473.036,132.186,472.971,131.79,472.929,131.385z M165.853,484.783c-9.837,8.18-24.796,12.055-43.09,12.055    c-10.938,0-18.701-0.693-23.959-1.387v-91.708c7.759-1.243,17.87-1.932,28.539-1.932c17.732,0,29.231,3.182,38.223,9.975    c9.705,7.201,15.801,18.698,15.801,35.181C181.367,464.835,174.854,477.171,165.853,484.783z M234.845,497.393    c-27.703,0-43.917-20.926-43.917-47.519c0-27.979,17.867-48.908,45.439-48.908c28.683,0,44.324,21.48,44.324,47.244    C280.697,478.831,262.137,497.393,234.845,497.393z M342.356,479.796c6.373,0,13.438-1.387,17.591-3.044l3.187,16.483    c-3.879,1.932-12.604,4.02-23.959,4.02c-32.289,0-48.908-20.084-48.908-46.688c0-31.864,22.724-49.602,50.977-49.602    c10.939,0,19.255,2.221,22.992,4.158l-4.293,16.761c-4.295-1.806-10.247-3.465-17.733-3.465c-16.767,0-29.785,10.11-29.785,30.888    C312.434,468.017,323.521,479.796,342.356,479.796z M426.587,495.871l-8.451-16.902c-3.464-6.511-5.68-11.361-8.315-16.769h-0.272    c-1.942,5.407-4.295,10.258-7.201,16.769l-7.76,16.902h-24.104l27.013-47.245L371.459,402.5h24.24l8.169,17.044    c2.771,5.671,4.85,10.247,7.064,15.508h0.274c2.216-5.949,4.021-10.111,6.373-15.508l7.895-17.044h24.105l-26.315,45.57    l27.701,47.805h-24.379V495.871z M96.757,365.076V21.502H345.81v110.006c0,5.935,4.819,10.751,10.751,10.751h94.972v222.816    H96.757z" />
          <path d="M129.558,418.011c-4.713,0-7.755,0.42-9.562,0.833v61.09c1.806,0.408,4.713,0.408,7.347,0.408    c19.121,0.143,31.58-10.388,31.58-32.683C159.057,428.268,147.7,418.011,129.558,418.011z" />
          <path d="M235.813,417.738c-14.268,0-22.572,13.574-22.572,31.722c0,18.284,8.59,31.166,22.723,31.166    c14.265,0,22.435-13.574,22.435-31.717C258.394,432.143,250.365,417.738,235.813,417.738z" />
          <g>
            <path d="M340.372,179.759V118.7H130.729v148.72h61.065v61.057h209.639V179.759H340.372z M191.794,256.67h-50.315V129.451h188.142     v50.308H191.794V256.67z M390.682,317.726H202.545V190.509h188.137V317.726z" />
            <circle cx="233.131" cy="213.354" r="7.166" />
            <rect x="251.3" y="210.667" width="109.302" height="5.375" />
            <circle cx="233.131" cy="239.334" r="7.166" />
            <rect x="251.3" y="236.646" width="109.302" height="5.375" />
            <circle cx="233.131" cy="267.294" r="7.167" />
            <rect x="251.3" y="264.604" width="109.302" height="5.375" />
            <path d="M233.131,286.555c3.956,0,7.166,3.212,7.166,7.172c0,3.952-3.21,7.159-7.166,7.159c-3.958,0-7.165-3.207-7.165-7.159     C225.966,289.767,229.173,286.555,233.131,286.555z" />
            <rect x="251.3" y="291.038" width="109.302" height="5.375" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function ArchiveFileIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      version="1.1"
      {...props}
    >
      <g id="layer1">
        <path
          d="M 3 0 L 3 20 L 17 20 L 17 5 L 17 4 L 13 0 L 12 0 L 10 0 L 10 1 L 12 1 L 12 4 L 12 5 L 16 5 L 16 19 L 4 19 L 4 1 L 6 1 L 6 0 L 3 0 z M 8 0 L 8 1 L 9 1 L 9 0 L 8 0 z M 8 1 L 7 1 L 7 2 L 8 2 L 8 1 z M 8 2 L 8 3 L 9 3 L 9 2 L 8 2 z M 8 3 L 7 3 L 7 4 L 8 4 L 8 3 z M 8 4 L 8 5 L 9 5 L 9 4 L 8 4 z M 8 5 L 7 5 L 7 6 L 8 6 L 8 5 z M 8 6 L 8 7 L 9 7 L 9 6 L 8 6 z M 8 7 L 7 7 L 7 8 L 8 8 L 8 7 z M 8 8 L 8 9 L 9 9 L 9 8 L 8 8 z M 8 9 L 7 9 L 7 10 L 8 10 L 8 9 z M 13 1.3535156 L 15.646484 4 L 13 4 L 13 1.3535156 z M 7 11 L 6 15 L 6 18 L 10 18 L 10 15 L 9 11 L 7 11 z M 7 16 L 9 16 L 9 17 L 7 17 L 7 16 z "
          fill="#222222"
          fillOpacity="1"
          stroke="none"
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}

function CodeFileIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      version="1.1"
      id="Capa_1"
      width="24"
      height="24"
      viewBox="0 0 31.612 31.612"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path d="M10.871,13.671l-4.058,4.057c-0.234,0.234-0.367,0.553-0.367,0.885c0,0.333,0.133,0.65,0.367,0.885l3.923,3.924    c0.245,0.244,0.565,0.367,0.887,0.367c0.32,0,0.641-0.123,0.885-0.367c0.49-0.488,0.49-1.281,0-1.771L9.47,18.613l3.173-3.172    c0.489-0.488,0.489-1.281,0-1.77C12.152,13.182,11.36,13.182,10.871,13.671z" />
          <path d="M18.969,15.443l3.174,3.171l-3.039,3.038c-0.488,0.488-0.488,1.281,0,1.771c0.244,0.244,0.564,0.366,0.886,0.366    s0.642-0.122,0.887-0.366l3.923-3.924c0.234-0.234,0.367-0.554,0.367-0.886c0-0.333-0.133-0.651-0.367-0.886l-4.058-4.056    c-0.489-0.489-1.281-0.489-1.771,0C18.48,14.16,18.48,14.954,18.969,15.443z" />
          <path d="M13.265,26.844c0.081,0.023,0.162,0.037,0.245,0.037c0.356,0,0.688-0.232,0.798-0.592l4.59-14.995    c0.138-0.441-0.111-0.908-0.553-1.043c-0.443-0.135-0.906,0.113-1.043,0.554L12.71,25.799    C12.576,26.241,12.823,26.707,13.265,26.844z" />
          <path d="M11.216,0L3.029,8.643v22.969h25.554V0H11.216z M10.495,3.635v3.83H6.867L10.495,3.635z M26.605,29.637H5.005V9.441h7.465    V1.975h14.135V29.637z" />
        </g>
      </g>
    </svg>
  );
}

function PptxIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      version="1.1"
      id="Capa_1"
      width="24"
      height="24"
      viewBox="0 0 550.801 550.801"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <g>
          <path d="M475.095,132c-0.032-2.529-0.833-5.023-2.568-6.995L366.324,3.694c-0.021-0.031-0.053-0.042-0.084-0.076    c-0.633-0.707-1.36-1.29-2.141-1.804c-0.232-0.15-0.465-0.285-0.707-0.419c-0.686-0.369-1.393-0.67-2.131-0.892    c-0.2-0.061-0.379-0.14-0.58-0.195C359.87,0.119,359.047,0,358.203,0H97.2C85.292,0,75.6,9.693,75.6,21.601v507.6    c0,11.913,9.692,21.601,21.6,21.601H453.6c11.918,0,21.601-9.688,21.601-21.601V133.207    C475.2,132.804,475.137,132.398,475.095,132z M175.046,463.014c-7.533,7.093-18.673,10.277-31.693,10.277    c-2.892,0-5.508-0.147-7.533-0.442v34.878h-21.848v-96.229c6.805-1.16,16.35-2.03,29.813-2.03c13.608,0,23.295,2.6,29.813,7.811    c6.215,4.925,10.418,13.025,10.418,22.58C184.017,449.413,180.829,457.514,175.046,463.014z M259.14,463.014    c-7.525,7.093-18.674,10.277-31.691,10.277c-2.895,0-5.503-0.147-7.528-0.442v34.878h-21.848v-96.229    c6.803-1.16,16.35-2.03,29.813-2.03c13.608,0,23.301,2.6,29.813,7.811c6.22,4.925,10.415,13.025,10.415,22.58    C268.115,449.413,264.935,457.514,259.14,463.014z M349.756,428.721h-26.631v79.006h-22.148v-79.006h-26.191v-18.526h74.971    V428.721z M415.463,507.727l-8.828-17.655c-3.612-6.803-5.933-11.865-8.68-17.508h-0.285c-2.035,5.643-4.493,10.705-7.53,17.508    l-8.11,17.655h-25.176l28.224-49.349l-27.211-48.184h25.323l8.537,17.798c2.896,5.938,5.068,10.711,7.383,16.211h0.29    c2.32-6.223,4.198-10.568,6.655-16.211l8.248-17.798h25.186l-27.501,47.614l28.936,49.918H415.463z M97.2,366.758V21.605h250.203    v110.519c0,5.961,4.831,10.8,10.8,10.8H453.6l0.011,223.834H97.2z" />
          <path d="M144.946,426.11c-4.485,0-7.533,0.438-9.121,0.87v28.798c1.885,0.438,4.198,0.575,7.383,0.575    c11.723,0,18.966-5.933,18.966-15.916C162.166,431.463,155.941,426.11,144.946,426.11z" />
          <path d="M229.041,426.11c-4.487,0-7.527,0.438-9.115,0.87v28.798c1.886,0.438,4.195,0.575,7.375,0.575    c11.731,0,18.966-5.933,18.966-15.916C246.262,431.463,240.036,426.11,229.041,426.11z" />
        </g>
        <g>
          <path d="M199.682,120.021c-51.511,3.482-92.249,46.256-92.249,98.658c0,12.237,2.328,23.905,6.389,34.723l85.86-37.655V120.021z" />
          <path d="M118.141,263.301c16.324,32.233,49.687,54.377,88.291,54.377c33.404,0,62.883-16.596,80.812-41.939l-81.261-50.968    L118.141,263.301z" />
          <path d="M212.425,118.671v94.959l82.54,51.78c7.884-14.212,12.408-30.542,12.408-47.946    C307.373,164.154,265.204,120.814,212.425,118.671z" />
          <rect x="325.804" y="175.922" width="108" height="16.119" />
          <rect x="325.804" y="216.958" width="108" height="16.118" />
          <rect x="325.804" y="257.35" width="108" height="16.118" />
        </g>
      </g>
    </svg>
  );
}

function TxtIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      version="1.1"
      id="Capa_1"
      width="24"
      height="24"
      viewBox="0 0 90.604 90.604"
      xmlSpace="preserve"
      {...props}
    >
      <g>
        <g>
          <path d="M58.596,0H12.255v90.604h66.094v-63.73L54.868,10.66L58.596,0z M35.35,38.153h-6.011v17.835h-4.998V38.153h-5.913v-4.181    H35.35V38.153z M57.132,33.972h16.922v4.181h-6.012v17.835h-4.997V38.153h-5.913V33.972z M55.6,33.972l-6.206,10.747l6.533,11.269    h-5.75l-1.993-3.984c-0.815-1.536-1.339-2.68-1.959-3.951H46.16c-0.458,1.271-1.014,2.416-1.699,3.951l-1.829,3.984h-5.684    l6.369-11.139l-6.141-10.877h5.717l1.928,4.017c0.652,1.34,1.143,2.418,1.665,3.66h0.065c0.522-1.404,0.946-2.385,1.503-3.66    l1.861-4.017H55.6z" />
          <polygon points="63.235,0.097 60.216,8.734 78.348,21.254   " />
        </g>
      </g>
    </svg>
  );
}

function DownloadIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileAudioIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0" />
    </svg>
  );
}

function FileIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FileImageIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <circle cx="10" cy="12" r="2" />
      <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
    </svg>
  );
}

function FileSpreadsheetIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  );
}

function FileVideoIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m10 11 5 3-5 3v-6Z" />
    </svg>
  );
}

function XIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
