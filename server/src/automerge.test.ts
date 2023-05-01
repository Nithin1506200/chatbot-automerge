import * as automerge from "@automerge/automerge";

function test1() {
  let doc1 = automerge.from({ k: ["nithin"] });

  let doc2 = automerge.from({ k: ["nithin", "hel"] });

  const doc3 = automerge.merge(doc2, doc1);
  let doc4 = automerge.merge(doc1, doc2);
  console.log({ doc1, doc2, doc3, doc4 });
}
function test2() {
  let doc1 = automerge.from({ task: ["nithin"] });
  let doc2 = automerge.clone(doc1);
  console.log({ doc1, doc2 });
  doc1 = automerge.change(doc1, (d) => {
    d.task.push("doc1");
  });
  let doc3 = automerge.merge(doc1, doc2);
  let doc4 = automerge.merge(doc2, doc1);
  console.log({ doc1, doc2, doc3, doc4 });
}
test1();
test2();
