import { Button, ButtonTypeEnum, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Tag, TagTypeEnum } from '@shared/ui/Tag';
import { Input } from '@shared/ui/Input';
import { useState } from 'react';

export const MainPage = () => {
    const [value, setValue] = useState<string>('');

    return (
        <div>
            <Text.Heading weight={WeightEnum.BOLD} className={'1224'} size={SizeEnum.H1}
                          color={ColorEnum.BLACK}>124</Text.Heading>
            <Text.Heading size={SizeEnum.H2} color={ColorEnum.BLACK}>124</Text.Heading>
            <Text.Heading size={SizeEnum.H3} color={ColorEnum.BLACK}>124</Text.Heading>
            <Text.Heading size={SizeEnum.H4} color={ColorEnum.BLACK}>124</Text.Heading>
            <Text.Heading size={SizeEnum.H5} color={ColorEnum.BLACK}>124</Text.Heading>
            <Text.Heading size={SizeEnum.H6} color={ColorEnum.BLACK}>124</Text.Heading>


            <Text.Paragraph size={SizeEnum.H1} color={ColorEnum.BLACK}>124</Text.Paragraph>
            <Text.Paragraph size={SizeEnum.H2} color={ColorEnum.BLACK}>124</Text.Paragraph>
            <Text.Paragraph size={SizeEnum.H3} color={ColorEnum.BLACK}>124</Text.Paragraph>
            <Text.Paragraph size={SizeEnum.H4} color={ColorEnum.BLACK}>124</Text.Paragraph>
            <Text.Paragraph size={SizeEnum.H5} color={ColorEnum.BLACK}>124</Text.Paragraph>
            <Text.Paragraph size={SizeEnum.H6} color={ColorEnum.BLACK}>124</Text.Paragraph>


            <Text.Link to={'124'} size={SizeEnum.H1}>124</Text.Link>
            <Text.Link to={'124'} size={SizeEnum.H2}>124</Text.Link>
            <Text.Link to={'124'} size={SizeEnum.H3}>124</Text.Link>
            <Text.Link to={'124'} size={SizeEnum.H4}>124</Text.Link>
            <Text.Link to={'124'} size={SizeEnum.H5}>124</Text.Link>
            <Text.Link to={'124'} size={SizeEnum.H6}>124</Text.Link>


            <Button size={SizeEnum.H1} color={ColorEnum.WHITE}>1e4dasdasdsa</Button>
            <Button size={SizeEnum.H2} buttonType={ButtonTypeEnum.DASHED}>1e4dasdasdsa</Button>
            <Button size={SizeEnum.H3} buttonType={ButtonTypeEnum.DEFAULT}>1e4dasdasdsa</Button>
            <Button size={SizeEnum.H4} buttonType={ButtonTypeEnum.DEFAULT}>1e4dasdasdsa</Button>
            <Button size={SizeEnum.H5} buttonType={ButtonTypeEnum.DEFAULT}>1e4dasdasdsa</Button>
            <Button size={SizeEnum.H6} buttonType={ButtonTypeEnum.DEFAULT}>1e4dasdasdsa</Button>

            <Tag size={SizeEnum.H1} border={BorderEnum.H1}>142</Tag>
            <Tag size={SizeEnum.H2} border={BorderEnum.H2}>142</Tag>
            <Tag size={SizeEnum.H3} tagType={TagTypeEnum.DASHED} border={BorderEnum.H3}>142</Tag>
            <Tag size={SizeEnum.H4} tagType={TagTypeEnum.FILLED} border={BorderEnum.H4}>142</Tag>
            <Tag size={SizeEnum.H5} tagType={TagTypeEnum.DEFAULT} border={BorderEnum.H5}>142</Tag>
            <Tag size={SizeEnum.H6} border={BorderEnum.H6}>142</Tag>

            <Input label={'124'} size={SizeEnum.H1} border={BorderEnum.H4} color={ColorEnum.BLACK} value={value}
                   onChange={(value) => {
                       setValue(value.target.value);
                   }} />
            <Input label={'124'} size={SizeEnum.H2} border={BorderEnum.H6} bgColor={ColorEnum.BLACK} color={ColorEnum.WHITE} value={value}
                   onChange={(value) => {
                       setValue(value.target.value);
                   }} />
            <Input label={'124'} size={SizeEnum.H3} border={BorderEnum.H4} color={ColorEnum.BLACK} value={value}
                   onChange={(value) => {
                       setValue(value.target.value);
                   }} />
            <Input label={'124'} size={SizeEnum.H4} border={BorderEnum.H5} color={ColorEnum.BLACK} value={value}
                   onChange={(value) => {
                       setValue(value.target.value);
                   }} />
            <Input label={'124'} size={SizeEnum.H5} border={BorderEnum.H6} color={ColorEnum.BLACK} value={value}
                   onChange={(value) => {
                       setValue(value.target.value);
                   }} />
            <Input label={'124'} size={SizeEnum.H6} border={BorderEnum.H6} color={ColorEnum.BLACK} value={value}
                   onChange={(value) => {
                       setValue(value.target.value);
                   }} />
        </div>
    );
};

