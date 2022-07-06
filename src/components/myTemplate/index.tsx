import { useEffect, useState, FC, memo, createContext } from 'react';
import { Select, Input, Tree } from 'antd';
import { SearchOutlined, CarryOutOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer } from './style';
import { getRegionList, getRegionTreeList } from '@/apis';
import { typeList } from '@/commonInterface';
import { useImmer } from 'use-immer';
const { Option } = Select;

export interface templageProps {
  energyType: number;
  area: string;
}

const defaultData = {
  energyType: 0,
  area: 'shanghai',
};

type IProps = {
  showJL?: boolean;
};

// 创造一个上下文
export const TemplateContext = createContext<templageProps>(defaultData);

const MyTemplate: FC<IProps> = memo(({ children, showJL }) => {
  const [contextProps, setContextProps] = useImmer(defaultData);
  const onChange = (key: string) => {
    const ck = parseInt(key);
    setContextProps((p) => {
      p.energyType = ck - 1;
    });
  };

  const onSelectAreaChange = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <TemplateContext.Provider value={contextProps}>
      <RealContainer>
        <RealOption
          onChange={onChange}
          onSelectAreaChange={onSelectAreaChange}
        />
        {children}
      </RealContainer>
    </TemplateContext.Provider>
  );
});

type RealOptionProps = {
  onChange: (e: string) => void;
  onSelectAreaChange: (selectedKeys: React.Key[], info: any) => void;
};

export const RealOption: FC<RealOptionProps> = memo(
  ({ onChange, onSelectAreaChange }) => {
    const [tree, setTree] = useState<any>([]);
    const [searchName, setSearchName] = useState('');

    const getRegionTreeListRequest = () => {
      getRegionTreeList().then((res: any) => {
        if (res?.meta?.code === 200) {
          const data = res.data;
          formatTreeData(data);
          setTree([...data]);
        }
      });
    };

    const formatTreeData = (data: any) => {
      data.map((item: any) => {
        item.title = item.name;
        item.key = item.id;
        item.icon = item.children ? <CarryOutOutlined /> : <CarryOutOutlined />;
        if (item.children && item.children.length) {
          formatTreeData(item.children);
        }
      });
    };

    const onChangeName = (e: any) => {
      const value = e?.target?.value;
      setSearchName(value);
      getSearchResult(value);
    };

    const onKeyDownName = (e: any) => {
      if (e.keyCode === 13) {
        if (searchName) {
          getSearchResult(searchName);
        }
      }
    };

    const getSearchResult = (name: string) => {
      if (!name) {
        getRegionTreeListRequest();
      } else {
        getRegionList({ name, current: 1, size: 10 }).then((res: any) => {
          if (res?.meta?.code === 200) {
            const data = res.data?.list;
            formatTreeData(data);
            setTree([...data]);
          }
        });
      }
    };

    useEffect(() => {
      getRegionTreeListRequest();
    }, []);

    return (
      <RealOptionContainer>
        <Select size="large" defaultValue={1 as any} onChange={onChange}>
          {typeList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Input
          size="large"
          suffix={<SearchOutlined />}
          placeholder="节点名称"
          value={searchName}
          onChange={onChangeName}
          onKeyDown={onKeyDownName}
        />
        <Tree
          showLine={true}
          showIcon={false}
          onSelect={onSelectAreaChange}
          treeData={tree}
        />
      </RealOptionContainer>
    );
  },
);

MyTemplate.displayName = 'MyTemplate';

export default MyTemplate;
