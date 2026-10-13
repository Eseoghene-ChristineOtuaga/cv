"use client";

import { Fragment, useState } from "react";
import { workflow } from "@/lib/data";

export default function Workflow() {
  const [openTip, setOpenTip] = useState<string | null>(null);

  return (
    <div className="workflow-section">
      <p className="workflow-label">How My Tools Come Together</p>

      <ol className="workflow-track">
        {workflow.map(({ label, tip, icon: Icon, className }, i) => (
          <Fragment key={label}>
            {i > 0 && (
              <li className="wf-arrow" aria-hidden="true">
                &#8594;
              </li>
            )}
            <li className="wf-node">
              <button
                type="button"
                className={`wf-bubble ${className}${openTip === label ? " tip-open" : ""}`}
                data-tip={tip}
                aria-label={`${label}: ${tip}`}
                onClick={() => setOpenTip((cur) => (cur === label ? null : label))}
                onBlur={() => setOpenTip((cur) => (cur === label ? null : cur))}
              >
                <Icon aria-hidden="true" />
              </button>
              <span className="wf-text">
                <span className="wf-label">{label}</span>
                <span className="wf-tip">{tip}</span>
              </span>
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
