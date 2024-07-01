import { HelpOutlineRounded, ArrowDropDown } from '@mui/icons-material';
import { Box, SxProps, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { TAppDenom, mapTokenToIcon } from 'src/types/recipe';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'


export default function DenomIconLiquid({ token1, token2, sxIcon, index }: { token1: string; token2: string; sxIcon?: SxProps, index: number }) {
    const Icon1 = mapTokenToIcon[token1 as TAppDenom] ?? HelpOutlineRounded;
    const Icon2 = mapTokenToIcon[token2 as TAppDenom] ?? HelpOutlineRounded;

    // dnd 
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: index });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Accordion style={{ margin: '40px 0px', height: '80px', borderRadius: '10px' }}>
            <AccordionSummary
                expandIcon={<ArrowDropDown />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Box ref={setNodeRef} style={style} {...attributes} {...listeners} sx={{ display: 'flex', zIndex: '10000', borderRadius: '10px', cursor: 'pointer', padding: '5px 10px', border: '1px solid', placeItems: 'center', columnGap: 0.6, pr: { xsm: '10px' } }}>
                    <Icon1 sx={{ fontSize: '36px', ...sxIcon }} />
                    <Icon2 sx={{ fontSize: '36px', ...sxIcon }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: { xs: '100%', xsm: '50%', md: '150px' } }}>
                        <Typography variant="h6">{token1}</Typography>
                        <Typography variant="h6">/</Typography>
                        <Typography variant="h6">{token2}</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
    );
}