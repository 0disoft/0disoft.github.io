---
{
  "title": "Opening Photoshop files in the browser",
  "summary": "How Photopea grew from a solo web editor to 350 million uses in a year."
}
---

In 2012, Ivan Kutskir was studying computer science in Prague when he wanted to open Photoshop PSD files on the web. The starting point was a tool showing the layers composing an image, hiding or showing each layer. He was already earning $100–400 a month from ads on web games he had made, and he enjoyed building new programs. He started Photopea in spare time alongside his studies.

The first version, released on September 14, 2013, read a PSD file and displayed it. It included zoom, pan, layer and mask moves, and undo. Supported color formats were limited, and it did not reproduce every effect stored in Photoshop files. Kutskir released the program with that narrow scope.

The hard part came right after reading files. Adobe's public PSD documentation explained how to pull numbers and strings from a file, but not how to combine that data into the same image Photoshop draws. Kutskir had to implement layer blending and effects such as shadows himself. His launch post even asked readers for help, admitting he did not yet understand how one bevel effect worked.

Speed needed fixing too. Early Photopea was written in JavaScript, with the browser computing images on the user's CPU. Files with many layers and effects took seconds to display, and small edits re-composited the whole image. Releasing that state, he explained the need to reuse computation results and use graphics processors.

In September 2016 he introduced a $5-per-month premium account. It added no extra editing features, and the account button turned green. The paid-account notice said the money would support future development. Free users kept full editing features, while supporters got a way to pay.

Conviction about the business came from advertising. Kutskir recalled that only when ads earned $400 a month in 2017 did he believe in Photopea's potential, about five years after starting. The free editor was gathering people, and that usage was turning into real income.

In April that year he added Sketch file support. Work files from Sketch, then used on Macs, could be brought into the browser to inspect and edit layers and text. Changing colors and gradients or saving as PSD also worked. Photopea's coverage widened beyond Photoshop files to other design programs.

Compatibility with existing file formats held a central place in the development principles he laid out. He said advanced editing should work without cost or device limits, support files from many programs, and keep work usable even if one program disappeared. Design files hold not just finished pictures but the layers and text needed for edits. Keeping that structure usable in other programs set Photopea's direction.

Early promotion did not go smoothly. Kutskir commented on every post introducing Photoshop alternatives and promoted Photopea on Reddit and Hacker News, but said about 90% of his posts and comments were deleted as self-promotion. Review requests to YouTubers mostly went unanswered, and those who replied asked fees he could not afford. Over time, people he never asked started posting reviews and tutorials, and those posts and videos brought new users.

By the end of 2017, over 2.5 million people had visited Photopea, with 120,000 hours of use. Besides writing the program, Kutskir made the tool icons, logo, and official blog posts himself. He also resolved 400 user-reported bugs and feature requests. As reactions improved, he decided to keep developing as long as possible.

In 2019, users' annual work time in Photopea grew to 5 million hours. His disclosed income then was about $250,000, averaging roughly 5 cents per hour of use. As more people used the free editor and hours piled up, the student hobby project grew into a business supporting his living.

File compatibility kept expanding. In 2020 he added Figma files, importing design structure and styles and saving as PSD. In 2021 Illustrator support brought in shape paths, groups, and editable text. Features for bringing each program's work into the browser piled up one by one.

In April 2021, Kutskir said trailing-twelve-month revenue was nearing $1 million. About 90% came from ads, the rest from ad-removing premium subscriptions and licenses for a self-hosted version. In a September interview he put monthly visits at 10 million and monthly usage at 1.5 million hours. A revenue structure where the business grew without users paying directly had taken hold.

How the program runs mattered for that scale. Photopea loads editor code from the website, then performs core image processing on the user's device. Basic editing needs no round trip sending every source file to the operator's server. So more users did not mean proportionally more servers for their image operations.

Web hosting cost Kutskir disclosed for 2021 was $50 a year. Later, as traffic grew, he moved to a $600-a-year plan, he explained in 2026 — after the host told him he used more traffic than all its other customers combined.

Web distribution also cut maintenance burden. A separate installable program would need its own version developed and managed, plus users failing to update and re-reporting already-fixed bugs. Kutskir explained that burden concretely when asked for a standalone version. The web editor kept the path from fixed code to users simple.

User support fed directly into features. In 2020 Kutskir said resolved GitHub issues had reached 2,300. In a 2021 Hacker News thread, GIMP's ‘Color to Alpha’ feature for turning one color transparent came up. He replied in the same thread that he had added it to Photopea.

He also tried building a team. In a 2021 interview Kutskir said he worked with several programmers and wanted a team that could run without him. The PeaDrive save feature and some filters were actually built by others. But explaining work, reviewing results, and requesting fixes was hard, and valuing his own implementation speed, he kept most development himself.

The product kept expanding technically after revenue grew. In April 2024 he added 16-bit and 32-bit color plus GPU acceleration, opening and saving PSDs holding more color information. Features for precise editing followed, such as smoothing harsh banding when adjusting brightness strongly. It was the result of widening, over a decade, the image-processing scope that the first version covered only narrowly.

By Kutskir's 2026 accounting, Photopea was used 350 million times in 2025, with users opening 1 billion files. Fourteen years had passed since he started. He said developing Photopea after graduation was the only job he had ever held.

Chances to sell came too. Kutskir recalled turning down a $5 million acquisition offer when earning $500,000 a year, doubting the money would make his life much better. Building and growing Photopea was fun, and he worried about finding anything as fun again after a sale. He chose to keep owning and making the product.
